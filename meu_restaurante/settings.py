from pathlib import Path

# Diretório base do projeto
BASE_DIR = Path(__file__).resolve().parent.parent

# Configurações principais
SECRET_KEY = 'sua-chave-secreta-aqui'  # Substitua por uma chave segura
DEBUG = True
ALLOWED_HOSTS = [
    'localhost', 
    '127.0.0.1',
    '0.0.0.0',
    '4363671825424e60ac9762b0294ccb16.vfs.cloud9.us-east-1.amazonaws.com'
]

LOGIN_REDIRECT_URL = '/pedido.html'  # Redireciona para a página de pedidos após o login

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

# Aplicativos instalados
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'meu_restaurante',  # app principal
    'rest_framework',
    'rest_framework_simplejwt',
]

# Middleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Configurações de URL e WSGI
ROOT_URLCONF = 'meu_restaurante.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR / 'templates',  #templates globais, se houver.
            BASE_DIR / 'meu_restaurante' / 'templates', 
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'meu_restaurante.wsgi.application'

# Banco de dados 
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'postgre',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}


# Configurações de autenticação
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Configurações de idioma e fuso horário
LANGUAGE_CODE = 'pt-br'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Configurações de arquivos estáticos
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static',  # Configuração para encontrar arquivos estáticos
]

# Configurações de arquivos de mídia (se necessário)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media/'

# Configuração de chave padrão para campos de modelo
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
