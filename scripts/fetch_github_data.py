#!/usr/bin/env python3
"""
Script para obtener información de repositorios de GitHub y guardarla en JSON.
Uso: python fetch_github_data.py
"""

import json
import requests
import time
import os

# Catálogo de software (copiado de main.js)
SOFTWARE_CATALOG = [
    {"id": "balldontlie-api", "github_url": "https://github.com/Gobboso/BALLDONTLIE_API", "category": "desarrollo", "author_name": "Gabriel Garcia", "featured": True},
    {"id": "pokeapi", "github_url": "https://github.com/monty0512/PokeAPI", "category": "desarrollo", "author_name": "Jhonatan Montalvo", "featured": True},
    {"id": "starwars-api", "github_url": "https://github.com/luissm4/taller-starwars", "category": "desarrollo", "author_name": "Luis Muñoz Gaviria", "featured": True},
    {"id": "address-api", "github_url": "https://github.com/D4ZH/addressAPI", "category": "utilidades", "author_name": "Miller Ferrer", "featured": False},
    {"id": "movie-api", "github_url": "https://github.com/Chispacion/MOVIE_API", "category": "desarrollo", "author_name": "Sebastian Gamarra", "featured": True},
    {"id": "universidades-api", "github_url": "https://github.com/jesusariza7/API-Universidades", "category": "educacion", "author_name": "Jesus Ariza", "featured": False},
    {"id": "joke-api", "github_url": "https://github.com/pedromolinares1/joke_api_python", "category": "desarrollo", "author_name": "Pedro Molinares", "featured": False},
    {"id": "diplomado-taller", "github_url": "https://github.com/IngIvanRoa/Taller-1-Diplomado-", "category": "desarrollo", "author_name": "Oscar Ivan Roa Bolaño", "featured": False},
    {"id": "metar-api", "github_url": "https://github.com/SaironOsorio/METARAPI", "category": "ciencia", "author_name": "Sairon Osorio", "featured": True},
    {"id": "jaider-api", "github_url": "https://github.com/JaiderSosa/API", "category": "desarrollo", "author_name": "Jaider Sosa Escorcia", "featured": False},
    {"id": "countries-api", "github_url": "https://github.com/andradefernando197221-coder/API_Countries", "category": "educacion", "author_name": "Luis Fernando Andrade", "featured": False},
    {"id": "deportes-api", "github_url": "https://github.com/andresmarquez9083-max/api_deportes", "category": "juegos", "author_name": "Andres Marquez", "featured": False},
    {"id": "noticias-api", "github_url": "https://github.com/luismunoz1129/noticiaAleatoria", "category": "utilidades", "author_name": "Luis Gerardo Muñoz Ruiz", "featured": True},
    {"id": "api-bustamante", "github_url": "https://github.com/luisbustamantedaniel-oss/Api", "category": "desarrollo", "author_name": "Luis Bustamante", "featured": False},
    {"id": "jhordangalindo-crypto-api", "github_url": "https://github.com/jhordangalindo/crypto-api", "category": "desarrollo", "author_name": "jhordangalindo", "featured": False},
    {"id": "mdmguerra-api_giphy", "github_url": "https://github.com/mdmguerra/api_giphy", "category": "desarrollo", "author_name": "mdmguerra", "featured": False},
    {"id": "jkevin10-padilla-taller-1", "github_url": "https://github.com/JKevin10-Padilla/Taller-1", "category": "desarrollo", "author_name": "JKevin10-Padilla", "featured": False},
    {"id": "rafaelherrera13-taller-rick-final", "github_url": "https://github.com/Rafaelherrera13/taller-rick-final", "category": "desarrollo", "author_name": "Rafaelherrera13", "featured": False},
    {"id": "wcarpintero-.api-rastreadora-de-ips", "github_url": "https://github.com/WCarpintero/.API-rastreadora-de-IPs", "category": "desarrollo", "author_name": "WCarpintero", "featured": False},
    {"id": "danielandrade3030-appmovies-api", "github_url": "https://github.com/danielandrade3030/appmovies-api", "category": "desarrollo", "author_name": "danielandrade3030", "featured": False},
    {"id": "mr-ink2-apiuniversity", "github_url": "https://github.com/Mr-INK2/ApiUniversity", "category": "desarrollo", "author_name": "Mr-INK2", "featured": False},
    {"id": "rooney0803-diplomado.git", "github_url": "https://github.com/ROONEY0803/diplomado", "category": "desarrollo", "author_name": "ROONEY0803", "featured": False},
    {"id": "leav-dev-api_paises_y_ciudades", "github_url": "https://github.com/leav-dev/api_paises_y_ciudades", "category": "desarrollo", "author_name": "leav-dev", "featured": False},
    {"id": "jeidii72-taller_api_paises.git", "github_url": "https://github.com/Jeidii72/Taller_Api_Paises", "category": "desarrollo", "author_name": "Jeidii72", "featured": False},
    {"id": "jesnayder-api_divisas", "github_url": "https://github.com/jesnayder/api_divisas", "category": "desarrollo", "author_name": "jesnayder", "featured": False},
    {"id": "marialeja20-pokeapi.git", "github_url": "https://github.com/Marialeja20/PokeApi", "category": "desarrollo", "author_name": "Marialeja20", "featured": False},
    {"id": "canascdaniel-hue-api_riackandmorty", "github_url": "https://github.com/canascdaniel-hue/api_RiackAndMorty", "category": "desarrollo", "author_name": "canascdaniel-hue", "featured": False},
    {"id": "umdm24-nasa-epic-api", "github_url": "https://github.com/UMDM24/NASA-EPIC-API", "category": "desarrollo", "author_name": "UMDM24", "featured": False},
]

def parse_github_url(url):
    """Extrae owner y repo de una URL de GitHub"""
    import re
    pattern = r'github\.com/([^/]+)/([^/\s]+)'
    match = re.search(pattern, url)
    if match:
        owner = match.group(1)
        repo = match.group(2).replace('.git', '').split('/')[0]
        return owner, repo
    return None, None

def get_repo_info(owner, repo):
    """Obtiene información del repositorio desde GitHub API"""
    url = f"https://api.github.com/repos/{owner}/{repo}"
    headers = {"Accept": "application/vnd.github.v3+json"}
    
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            return response.json()
        elif response.status_code == 403:
            print(f"  ⚠️  Rate limit alcanzado. Esperando 60 segundos...")
            time.sleep(60)
            return get_repo_info(owner, repo)  # Reintentar
        else:
            print(f"  ❌ Error {response.status_code} para {owner}/{repo}")
            return None
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return None

def get_languages(owner, repo):
    """Obtiene los lenguajes del repositorio"""
    url = f"https://api.github.com/repos/{owner}/{repo}/languages"
    headers = {"Accept": "application/vnd.github.v3+json"}
    
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            return response.json()
        return {}
    except:
        return {}

def main():
    print("🚀 Obteniendo información de repositorios de GitHub...")
    print(f"   Total de repositorios: {len(SOFTWARE_CATALOG)}\n")
    
    projects = []
    
    for i, app in enumerate(SOFTWARE_CATALOG, 1):
        print(f"[{i}/{len(SOFTWARE_CATALOG)}] Procesando: {app['id']}")
        
        owner, repo = parse_github_url(app['github_url'])
        if not owner or not repo:
            print(f"  ❌ URL inválida: {app['github_url']}")
            continue
        
        repo_info = get_repo_info(owner, repo)
        if not repo_info:
            # Crear entrada con datos mínimos si falla
            projects.append({
                "id": app['id'],
                "name": repo,
                "fullName": f"{owner}/{repo}",
                "description": "Sin descripción disponible",
                "author": owner,
                "author_name": app['author_name'],
                "authorUrl": f"https://github.com/{owner}",
                "githubUrl": app['github_url'],
                "stars": 0,
                "forks": 0,
                "watchers": 0,
                "language": "Desconocido",
                "languages": {},
                "license": "No especificada",
                "createdAt": None,
                "updatedAt": None,
                "pushedAt": None,
                "topics": [],
                "defaultBranch": "main",
                "openIssues": 0,
                "size": 0,
                "homepage": None,
                "category": app['category'],
                "featured": app['featured']
            })
            continue
        
        languages = get_languages(owner, repo)
        
        project = {
            "id": app['id'],
            "name": repo_info.get('name', repo),
            "fullName": repo_info.get('full_name', f"{owner}/{repo}"),
            "description": repo_info.get('description') or "Sin descripción disponible",
            "author": owner,
            "author_name": app['author_name'],
            "authorUrl": f"https://github.com/{owner}",
            "githubUrl": repo_info.get('html_url', app['github_url']),
            "stars": repo_info.get('stargazers_count', 0),
            "forks": repo_info.get('forks_count', 0),
            "watchers": repo_info.get('watchers_count', 0),
            "language": repo_info.get('language') or "Desconocido",
            "languages": languages,
            "license": repo_info.get('license', {}).get('spdx_id') if repo_info.get('license') else "No especificada",
            "createdAt": repo_info.get('created_at'),
            "updatedAt": repo_info.get('updated_at'),
            "pushedAt": repo_info.get('pushed_at'),
            "topics": repo_info.get('topics', []),
            "defaultBranch": repo_info.get('default_branch', 'main'),
            "openIssues": repo_info.get('open_issues_count', 0),
            "size": repo_info.get('size', 0),
            "homepage": repo_info.get('homepage'),
            "category": app['category'],
            "featured": app['featured']
        }
        
        projects.append(project)
        print(f"  ✅ {project['name']} - ⭐ {project['stars']}")
        
        # Pequeña pausa para no exceder rate limits
        time.sleep(0.5)
    
    # Guardar en JSON
    output_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')
    os.makedirs(output_dir, exist_ok=True)
    output_file = os.path.join(output_dir, 'projects.json')
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump({
            "lastUpdated": time.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "totalProjects": len(projects),
            "projects": projects
        }, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Guardado en: {output_file}")
    print(f"   Total de proyectos: {len(projects)}")

if __name__ == "__main__":
    main()
