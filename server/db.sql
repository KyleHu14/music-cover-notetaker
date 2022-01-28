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