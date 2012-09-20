CREATE TABLE purchases
(
	item_name 					VARCHAR(30),
	item_price					REAL,
	location_latitude 			NUMERIC,
	location_longitude			NUMERIC,
	photo_url					VARCHAR(30),
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
	category_name				VARCHAR(30)
);

CREATE TABLE emotions
(
	emotion						VARCHAR(30)
);