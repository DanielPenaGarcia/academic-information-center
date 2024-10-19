CREATE DATABASE IF NOT EXISTS academic_information_center;

USE academic_information_center;

CREATE TABLE IF NOT EXISTS academic_ids (
    academic_id VARCHAR(255) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255),
    academic_id VARCHAR(255) NOT NULL,
    photo BLOB,
    names VARCHAR(255) NOT NULL,
    father_last_name VARCHAR(255) NOT NULL,
    mother_last_name VARCHAR(255) NOT NULL,
    curp VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (academic_id) REFERENCES academic_ids(academic_id)
);

CREATE TABLE IF NOT EXISTS teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    academic_id VARCHAR(255) NOT NULL,
    photo BLOB,
    names VARCHAR(255) NOT NULL,
    father_last_name VARCHAR(255) NOT NULL,
    mother_last_name VARCHAR(255) NOT NULL,
    curp VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (academic_id) REFERENCES academic_ids(academic_id)
);

CREATE TABLE IF NOT EXISTS administrators (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    academic_id VARCHAR(255) NOT NULL,
    photo BLOB,
    names VARCHAR(255) NOT NULL,
    father_last_name VARCHAR(255) NOT NULL,
    mother_last_name VARCHAR(255) NOT NULL,
    curp VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (academic_id) REFERENCES academic_ids(academic_id)
);

CREATE TABLE IF NOT EXISTS course_maps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    semesters INT NOT NULL,
    year INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    hours_per_week INT NOT NULL,
    semester INT NOT NULL,
    course_map_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_map_id) REFERENCES course_maps(id)
);

CREATE TABLE IF NOT EXISTS subjects_requirements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject_id INT NOT NULL,
    required_subject_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (subject_id) REFERENCES subjects(id),
    FOREIGN KEY (required_subject_id) REFERENCES subjects(id)
);

CREATE TABLE IF NOT EXISTS teachers_subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id INT NOT NULL,
    subject_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject_id INT NOT NULL,
    teacher_id INT NOT NULL,
    start_time VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    duration INT NOT NULL,
    days VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS students_classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    class_id INT NOT NULL,
    grade DECIMAL(5, 2),
    status ENUM("PENDING", "APPROVED", "REJECTED") NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enrollment_period (
    id INT AUTO_INCREMENT PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enrollment_appointment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    enrollment_period_id INT NOT NULL,
    start_date_time DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS class_review (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    class_id INT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_review (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    comment TEXT NOT NULL,
    class_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admins_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id INT NOT NULL,
    action_description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear un TRIGGER para generar academic_id automáticamente al insertar un estudiante
DELIMITER //
CREATE TRIGGER before_insert_students
BEFORE INSERT ON students
FOR EACH ROW
BEGIN
    DECLARE new_academic_id VARCHAR(255);
    -- Generar un nuevo academic_id
    SET new_academic_id = LPAD((SELECT COUNT(*) + 1 FROM academic_ids), 11, '0');
    
    -- Insertar el nuevo academic_id en la tabla academic_ids
    INSERT INTO academic_ids (academic_id) VALUES (new_academic_id);
    
    -- Asignar el academic_id al nuevo estudiante
    SET NEW.academic_id = new_academic_id;
END;
//
DELIMITER ;

-- Crear un TRIGGER para generar academic_id automáticamente al insertar un docente
DELIMITER //
CREATE TRIGGER before_insert_teachers
BEFORE INSERT ON teachers
FOR EACH ROW
BEGIN
    DECLARE new_academic_id VARCHAR(255);
    -- Generar un nuevo academic_id
    SET new_academic_id = LPAD((SELECT COUNT(*) + 1 FROM academic_ids), 9, '0');
    
    -- Insertar el nuevo academic_id en la tabla academic_ids
    INSERT INTO academic_ids (academic_id) VALUES (new_academic_id);
    
    -- Asignar el academic_id al nuevo docente
    SET NEW.academic_id = new_academic_id;
END;
//
DELIMITER ;

-- Crear un TRIGGER para generar academic_id automáticamente al insertar un administrador
DELIMITER //
CREATE TRIGGER before_insert_administrators
BEFORE INSERT ON administrators
FOR EACH ROW
BEGIN
    DECLARE new_academic_id VARCHAR(255);
    -- Generar un nuevo academic_id
    SET new_academic_id = LPAD((SELECT COUNT(*) + 1 FROM academic_ids), 9, '0');
    
    -- Insertar el nuevo academic_id en la tabla academic_ids
    INSERT INTO academic_ids (academic_id) VALUES (new_academic_id);
    
    -- Asignar el academic_id al nuevo administrador
    SET NEW.academic_id = new_academic_id;
END;
//
DELIMITER ;