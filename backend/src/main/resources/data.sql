-- Requêtes INSERT INTO users

INSERT INTO users (username, email, password, role) VALUES ('AdminJohn', 'admin@bookmanager.com', 'admin123', 'admin');
INSERT INTO users (username, email, password, role) VALUES ('UserJane', 'client@bookmanager.com', 'client123', 'client');


INSERT INTO books (title, author, genre, summary, cover) VALUES 
('My Hero Academia Vol. 1', 'Kohei Horikoshi', 'Shonen', 'Dans un monde où 80% de la population possède un super-pouvoir appelé Alter, Izuku Midoriya en est dépourvu...', 'http://localhost:8080/uploads/my-hero-academia-1.jpg'),
('L Attaque des Titans Vol. 1', 'Hajime Isayama', 'Seinen', 'Il y a plus d un siècle, les humains ont failli être exterminés par des Titans. Ils vivent aujourd hui retranchés derrière de hauts murs...', 'http://localhost:8080/uploads/attaque-des-titans-1.jpg'),
('Naruto Vol. 1', 'Masashi Kishimoto', 'Shonen', 'Le jeune Naruto Uzumaki, garnement cancre et rejeté de tous, cache en lui le démon renard à neuf queues...', 'http://localhost:8080/uploads/naruto-1.jpg');