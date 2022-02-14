CREATE TABLE videos ( 
    id SERIAL PRIMARY KEY,
    video_link VARCHAR(255) NOT NULL
);

insert into videos
(video_link)
values
('https://www.youtube.com/watch?v=WeZAT4ivPWY');

create table video_data (
    id serial primary key,
    timestamp VARCHAR(15),
    description text default '...',
    video_id int references videos(id) not null
);

insert into video_data
    (timestamp, description, video_id)
values ('0:09', 'This sounds great! The first note is an E minor by squidward.', 1);

-- Adding video_title as a new value
-- Consistent naming convention

DROP TABLE video_data;
DROP TABLE videos;

CREATE TABLE videos ( 
    id SERIAL PRIMARY KEY,
    video_link VARCHAR(255) NOT NULL,
    video_title VARCHAR(255) NOT NULL
);

create table videos_data (
    id serial primary key,
    timestamp VARCHAR(15),
    description text default '...',
    video_id int references videos(id) not null
);

-- Inserting some placeholder data

insert into videos
    (video_link, video_title)
values
    ('https://www.youtube.com/watch?v=WeZAT4ivPWY', 'ツユ - ナミカレ　弾いてみた tuyu namikare guitar cover');

insert into videos_data
    (timestamp, description, video_id)
values ('0:09', 'This sounds great! The first note is an E minor by squidward.', 1);