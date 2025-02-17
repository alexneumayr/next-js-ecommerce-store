-- Create table
CREATE TABLE products (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(150) NOT NULL,
  slug varchar(150) NOT NULL UNIQUE,
  image varchar NOT NULL,
  price integer NOT NULL,
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
    'intenso-speed-line-64gb-memory-stick-usb-3-2-gen-1x1-black',
    'https://res.cloudinary.com/duayl4vkp/image/upload/v1739817004/wtfusfu0xivvs1ldnews.jpg',
    2000,
    '<b>The Intenso Speed Line is a powerful USB stick for all users who value fast data transfer.</b><div><br /></div><div>Thanks to its USB 3.2 Gen1x1 interface, it can reach up to 10 times higher transfer speeds than standard USB 2.0 sticks.</div><div><br /></div><div>Furthermore, the Speed Line is characterised by particularly high storage capacities of up to 256 GB, which is why it offers sufficient storage space for countless photos, videos, music and other memory-intensive files.</div>'
  ),
  (
    'PHIXERO P500 SSD Internal Hard Drive 1TB',
    'phixero-p500-ssd',
    'https://res.cloudinary.com/duayl4vkp/image/upload/v1739816942/ytaga7llufbgdmluxzok.jpg',
    2500,
    '<b>Increase Efficiency</b><div><br /></div><div>Experience the efficiency of 3D NAND, where our advanced components are designed for optimal performance from start to finish, resulting in very low power consumption of the PHIXERO P500.</div><div><br /></div><div>With the PHIXERO internal SSD, you can get your system up and running in just under 8 seconds.</div><div><br /></div><div>With read speeds of 550 MB/s and write speeds of 480 MB/s, you can run more demanding applications.</div>'
  ),
  (
    'TP-LINK ER605 5 Port Dual/Multiple WAN VPN Router',
    'tp-link-er605-5-port-dual',
    'https://res.cloudinary.com/duayl4vkp/image/upload/v1739816864/ksjqyixa6xfnjm7gm0cs.jpg',
    3000,
    '<ul><li>Integrated with Omada SDN Centralized Cloud Management and Intelligent Monitoring</li></ul><div><br /></div><ul><li>Centralized management</li></ul><div><br /></div><ul><li>Cloud access and Omada app for maximum convenience and easy management</li></ul><div><br /></div><ul><li>Five Gigabit ports</li></ul><div><br /></div><ul><li>Wired high-speed connectivity</li></ul><div><br /></div><ul><li>Up to 4 WAN ports: 1 Gigabit WAN port and 3 Gigabit WAN/LAN ports with load balancing increase the usage rate of multi-line broadband connections</li></ul>'
  ),
  (
    'Apple iPhone 15 (128GB) - Black',
    'apple-iphone-15',
    'https://res.cloudinary.com/duayl4vkp/image/upload/v1739817051/mpfx2uxosmluqjvdgb0w.jpg',
    80000,
    '<b>DYNAMIC ISLAND COMES ON THE IPHONE 15</b><div><br /></div><div><ul><li>Dynamic Island brings clues and live activities forward - so you dont miss anything when youre doing something else.</li><li>See whos calling, whether your flight is on time, and more.</li></ul><div><br /></div><b>Innovative design</b></div><div><b><br /></b>The iPhone 15 has a robust design made of dyed glass and aluminium. It is protected from water and dust. The ceramic shield front is harder than any smartphone glass. And the 6.1 inch Super Retina XDR display is up to 2x brighter in the sun than that of the iPhone 14.</div>'
  );
