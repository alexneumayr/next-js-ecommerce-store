-- Create table
CREATE TABLE products (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(150) NOT NULL,
  slug varchar(150) NOT NULL UNIQUE,
  image varchar(50) NOT NULL,
  price numeric(8, 0) NOT NULL,
  description varchar NOT NULL
);

-- Inserting data
INSERT INTO
  products (
    name,
    slug,
    image,
    price,
    description
  )
VALUES
  (
    'Intenso Speed Line 64GB Memory Stick USB 3.2 Gen 1x1, Black',
    'intenso-speed-line-64b',
    'intenso.png',
    2000,
    'The Intenso Speed Line is a powerful USB stick for all users who value fast data transfer. Thanks to its USB 3.2 Gen1x1 interface, it can reach up to 10 times higher transfer speeds than standard USB 2.0 sticks. Furthermore, the Speed Line is characterised by particularly high storage capacities of up to 256 GB, which is why it offers sufficient storage space for countless photos, videos, music and other memory-intensive files.'
  ),
  (
    'PHIXERO P500 SSD Internal Hard Drive 1TB',
    'phixero-p500-ssd',
    'phixero.png',
    2500,
    'Increase Efficiency: Experience the efficiency of 3D NAND, where our advanced components are designed for optimal performance from start to finish, resulting in very low power consumption of the PHIXERO P500. With the PHIXERO internal SSD, you can get your system up and running in just under 8 seconds. With read speeds of 550 MB/s and write speeds of 480 MB/s, you can run more demanding applications.'
  ),
  (
    'TP-LINK ER605 5 Port Dual/Multiple WAN VPN Router',
    'tp-link-er605-5-port-dual',
    'tp-link.png',
    3000,
    'Integrated with Omada SDN Centralized Cloud Management and Intelligent Monitoring
Centralized management Cloud access and Omada app for maximum convenience and easy management
Five Gigabit ports Wired high-speed connectivity
Up to 4 WAN ports 1 Gigabit WAN port and 3 Gigabit WAN/LAN ports with load balancing increase the usage rate of multi-line broadband connections'
  ),
  (
    'Apple iPhone 15 (128GB) - Black',
    'apple-iphone-15',
    'iphone.png',
    80000,
    'DYNAMIC ISLAND COMES ON THE IPHONE 15 – Dynamic Island brings clues and live activities forward – so you dont miss anything when youre doing something else.see whos calling, whether your flight is on time, and more.
    Innovative design - The iPhone 15 has a robust design made of dyed glass and aluminium. It is protected from water and dust. The ceramic shield front is harder than any smartphone glass. And the 6.1 inch Super Retina XDR display is up to 2x brighter in the sun than that of the iPhone 14.'
  );
