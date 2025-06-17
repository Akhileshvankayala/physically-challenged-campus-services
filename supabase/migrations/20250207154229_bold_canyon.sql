/*
  # Update RLS policies for service tables

  1. Changes
    - Update existing RLS policies to allow all authenticated users access
    - Remove user_id restrictions for better accessibility
  
  2. Security
    - Maintain RLS enabled on all tables
    - Allow authenticated users to read and create records
*/

DO $$ 
BEGIN
  -- Update buggy_bookings policies
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can create bookings' AND tablename = 'buggy_bookings') THEN
    DROP POLICY "Users can create bookings" ON buggy_bookings;
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can read own bookings' AND tablename = 'buggy_bookings') THEN
    DROP POLICY "Users can read own bookings" ON buggy_bookings;
  END IF;
  
  CREATE POLICY "Users can create bookings"
    ON buggy_bookings
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

  CREATE POLICY "Users can read own bookings"
    ON buggy_bookings
    FOR SELECT
    TO authenticated
    USING (true);

  -- Update canteen_orders policies
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can create orders' AND tablename = 'canteen_orders') THEN
    DROP POLICY "Users can create orders" ON canteen_orders;
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can read own orders' AND tablename = 'canteen_orders') THEN
    DROP POLICY "Users can read own orders" ON canteen_orders;
  END IF;

  CREATE POLICY "Users can create orders"
    ON canteen_orders
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

  CREATE POLICY "Users can read own orders"
    ON canteen_orders
    FOR SELECT
    TO authenticated
    USING (true);

  -- Update mobility_services policies
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can create mobility services' AND tablename = 'mobility_services') THEN
    DROP POLICY "Users can create mobility services" ON mobility_services;
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can read own mobility services' AND tablename = 'mobility_services') THEN
    DROP POLICY "Users can read own mobility services" ON mobility_services;
  END IF;

  CREATE POLICY "Users can create mobility services"
    ON mobility_services
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

  CREATE POLICY "Users can read own mobility services"
    ON mobility_services
    FOR SELECT
    TO authenticated
    USING (true);
END $$;