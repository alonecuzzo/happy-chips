CREATE TABLE purchases
(
	item_name 					VARCHAR(30),
	item_price					REAL,
	location_latitude 			NUMERIC,
	location_longitude			NUMERIC,
	photo_url					BLOB,
	question_1_due_date			NUMERIC,
	question_2_due_date			NUMERIC,
	question_3_due_date			NUMERIC,
	question_1_emotion			INTEGER,
	question_2_emotion			INTEGER,
	question_3_emotion			INTEGER,
	note						TEXT,
	remote_object_id			NUMERIC,
	date_time					TIMESTAMP DEFAULT (strftime('%s', 'now'))	
);

CREATE TABLE purchase_categories
(
	purchase_id					INTEGER,
	category_id					INTEGER
);

CREATE TABLE categories
(
	category_name				VARCHAR(30),
	icon_name					VARCHAR(60),
	white_icon_name				VARCHAR(60)
);

CREATE TABLE emotions
(
	emotion						VARCHAR(30),
	icon_name					VARCHAR(60),
	white_icon_name				VARCHAR(60)
);

CREATE TABLE users
(
	username					VARCHAR(30),
	email						VARCHAR(30),
	password					VARCHAR(30),
	first_name					VARCHAR(30),
	last_name					VARCHAR(30),
	points						INTEGER,
	challenges_completed		INTEGER,
	avatar_url					VARCHAR(30)
);

CREATE TABLE limits
(
	name						VARCHAR(30),
	end_date					NUMERIC,
	limit_amount				NUMERIC,
	limit_type					VARCHAR(30),
	limit_constraint			INTEGER,
	completed					BOOLEAN,
	date_time					TIMESTAMP DEFAULT (strftime('%s', 'now'))
);

CREATE TABLE limit_types
(
	limit_type					VARCHAR(30)
);