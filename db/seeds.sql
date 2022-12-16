INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 70000, 1),
       ("Salesperson", 50000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 100000, 2),
       ("Accountant", 80000, 3),
       ("Legal Team Lead", 200000, 4),
       ("Lawyer", 180000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ryan", "Taylor", 1, 1),
       ("Dallas", "Sybrowsky", 2, 1),
       ("Ana", "Bennett", 3, 2),
       ("Cobi", "Gottschalk", 4, 2),
       ("Anthony", "Farris", 5, 3),
       ("Christen", "Lorber", 6, 4),
       ("Brian", "Lee", 7, 4);