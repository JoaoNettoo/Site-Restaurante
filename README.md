# 🍔 Site de Restaurante

## ✨ Sobre o Projeto
Este é um site de restaurante desenvolvido usando **HTML, CSS e JavaScript**, com **Django** no back-end e **PostgreSQL** como banco de dados.

## 🛠️ Tecnologias Utilizadas
- **Front-end:** HTML, CSS, JavaScript
- **Back-end:** Django (Python)
- **Banco de Dados:** PostgreSQL
- **Hospedagem:** AWS EC2 (Cloud9)

## 💪 Como Executar Localmente
### 1. Clonar o Repositório
```sh
 git clone https://github.com/JoaoNettoo/Site-de-Restaurante.git
 cd Site-de-Restaurante
```
### 2. Criar e Ativar um Ambiente Virtual
```sh
 python -m venv venv
 source venv/bin/activate  # Linux/macOS
 venv\Scripts\activate     # Windows
```
### 3. Instalar Dependências
```sh
 pip install -r requirements.txt
```
### 4. Configurar Banco de Dados
Edite o arquivo `settings.py` e configure as credenciais do PostgreSQL.

### 5. Aplicar Migrações
```sh
 python manage.py migrate
```
### 6. Rodar o Servidor
```sh
 python manage.py runserver
```
Acesse o site em `http://127.0.0.1:8000/`

## 💻 Hospedagem na AWS
1. Suba a aplicação no **AWS EC2** usando **Cloud9**.
2. Configure o PostgreSQL na AWS.
3. Ajuste as configurações do banco no `settings.py`.
4. Rode as migrações e inicie o servidor Django.

---


