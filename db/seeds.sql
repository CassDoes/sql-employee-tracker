INSERT INTO department (name)
VALUES
  ('Cosmetics'),
  ('Bath and Shower'),
  ('Perfume'),
  ('Skin and Hair Care');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Cosmetics Manager', '120000', 1),
  ('Cosmetics Lead', '80000', 1),
  ('Cosmetics Partner', '55000', 1),
  ('Bath and Shower Manager', '130000', 2),
  ('Bath and Shower Lead', '85000', 2),
  ('Bath and Shower Partner', '60000', 2),
  ('Perfume Manager', '115000', 3),
  ('Perfume Lead', '75000', 3),
  ('Perfume Partner', '50000', 3),
  ('Skin and Hair Care Manager', '105000', 4),
  ('Skin and Hair Care Lead', '60000', 4),
  ('Skin and Hair Care Partner', '45000', 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, NULL),
  ('Virginia', 'Woolf', 2, 1),
  ('Piers', 'Gaveston', 3, 2),
  ('Charles', 'LeRoi', 4, NULL),
  ('Katherine', 'Mansfield', 5, 4),
  ('Dora', 'Carrington', 6, 5),
  ('Edward', 'Bellamy', 7, NULL),
  ('Montague', 'Summers', 8, 7),
  ('Octavia', 'Butler', 9, 8),
  ('Unica', 'Zurn', 10, NULL),
  ('Casey', 'Stock', 11, 10),
  ('Rosalie', 'Hardin', 12, 11);