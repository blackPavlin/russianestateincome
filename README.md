# Настройка сервера Ubuntu

apt update
apt upgrade

Установка nginx

apt install nginx
// Автозагрузка
systemctl enable nginx 
// Проверяем автозагрузку
systemctl is-enabled nginx
// Запуск
service nginx start
// Статус
service nginx status
// Перезапус
service nginx restart
