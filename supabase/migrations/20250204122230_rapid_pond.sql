/*
  # Fix RLS policies and add payments table

  1. New Tables
    - `payments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `amount` (integer)
      - `priority` (text)
      - `description` (text)
      - `status` (text)
      - `created_at` (timestamptz)

  2. Security
    - Add missing user_id to existing tables' insert policies
    - Enable RLS on payments table
    - Add policies for authenticated users
*/

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users NOT NULL,
  amount integer NOT NULL,
  priority text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on payments table
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Add policies for payments table
CREATE POLICY "Users can read own payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create payments"
  ON payments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Fix buggy_bookings policies
DROP POLICY IF EXISTS "Users can create bookings" ON buggy_bookings;
CREATE POLICY "Users can create bookings"
  ON buggy_bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Fix canteen_orders policies
DROP POLICY IF EXISTS "Users can create orders" ON canteen_orders;
CREATE POLICY "Users can create orders"
  ON canteen_orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Fix mobility_services policies
DROP POLICY IF EXISTS "Users can create mobility services" ON mobility_services;
CREATE POLICY "Users can create mobility services"
  ON mobility_services
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);