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
