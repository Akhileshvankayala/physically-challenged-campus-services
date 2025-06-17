/*
  # Initial Schema for Campus Services

  1. New Tables
    - users
      - id (uuid, primary key)
      - email (text, unique)
      - full_name (text)
      - phone (text)
      - role (text) - 'user', 'driver', 'worker'
      - created_at (timestamp)
    
    - buggy_bookings
      - id (uuid, primary key)
      - user_id (uuid, references users)
      - pickup_location (text)
      - drop_location (text)
      - distance (integer)
      - amount (integer)
      - status (text) - 'pending', 'in_progress', 'completed'
      - driver_id (uuid, references users)
      - created_at (timestamp)
    
    - canteen_orders
      - id (uuid, primary key)
      - user_id (uuid, references users)
      - canteen_name (text)
      - items (jsonb)
      - total_amount (integer)
      - status (text) - 'pending', 'in_progress', 'completed'
      - worker_id (uuid, references users)
      - created_at (timestamp)
    
    - mobility_services
      - id (uuid, primary key)
      - user_id (uuid, references users)
      - service_type (text) - 'wheelchair', 'walking_stick'
      - location (text)
      - duration_minutes (integer)
      - amount (integer)
      - status (text) - 'pending', 'in_progress', 'completed'
      - worker_id (uuid, references users)
      - created_at (timestamp)
    
    - suggestions
      - id (uuid, primary key)
      - user_id (uuid, references users)
      - content (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  role text NOT NULL DEFAULT 'user',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Buggy bookings table
CREATE TABLE buggy_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users NOT NULL,
  pickup_location text NOT NULL,
  drop_location text NOT NULL,
  distance integer NOT NULL,
  amount integer NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  driver_id uuid REFERENCES users,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE buggy_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own bookings"
  ON buggy_bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = driver_id);

CREATE POLICY "Users can create bookings"
  ON buggy_bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Canteen orders table
CREATE TABLE canteen_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users NOT NULL,
  canteen_name text NOT NULL,
  items jsonb NOT NULL,
  total_amount integer NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  worker_id uuid REFERENCES users,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE canteen_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own orders"
  ON canteen_orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = worker_id);

CREATE POLICY "Users can create orders"
  ON canteen_orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Mobility services table
CREATE TABLE mobility_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users NOT NULL,
  service_type text NOT NULL,
  location text NOT NULL,
  duration_minutes integer NOT NULL,
  amount integer NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  worker_id uuid REFERENCES users,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mobility_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own mobility services"
  ON mobility_services
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR auth.uid() = worker_id);

CREATE POLICY "Users can create mobility services"
  ON mobility_services
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Suggestions table
CREATE TABLE suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own suggestions"
  ON suggestions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create suggestions"
  ON suggestions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);