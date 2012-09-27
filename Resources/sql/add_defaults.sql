------------------------------------------------------------------
------------------------------------------------------------------
--Purchases

INSERT INTO purchases
(
	item_name,
	item_price,
	question_1_emotion
)
VALUES
(
	'wii u',
	249.99,
	1
);

INSERT INTO purchases
(
	item_name,
	item_price,
	question_1_emotion
)
VALUES
(
	'gameboy',
	49.99,
	2
);

INSERT INTO purchases
(
	item_name,
	item_price,
	question_1_emotion
)
VALUES
(
	'playstation 3',
	299.99,
	1
);

------------------------------------------------------------------
------------------------------------------------------------------
--Categories


INSERT INTO categories
(
	category_name,
	icon_name
)
VALUES
(
	'Drinks',
	'glyphicons_274_beer.png'
);

INSERT INTO categories
(
	category_name,
	icon_name
)
VALUES
(
	'Food',
	'glyphicons_276_cutlery.png'
);

INSERT INTO categories
(
	category_name,
	icon_name
)
VALUES
(
	'Clothing',
	'glyphicons_283_t-shirt.png'
);

INSERT INTO categories
(
	category_name,
	icon_name
)
VALUES
(
	'Sports',
	'glyphicons_312_rugby.png'
);

INSERT INTO categories
(
	category_name,
	icon_name
)
VALUES
(
	'Travel',
	'glyphicons_038_airplane.png'
);

INSERT INTO categories
(
	category_name,
	icon_name
)
VALUES
(
	'Video Games',
	'glyphicons_321_gamepad.png'
);

INSERT INTO categories
(
	category_name,
	icon_name
)
VALUES
(
	'Business',
	'glyphicons_341_briefcase.png'
);
------------------------------------------------------------------
------------------------------------------------------------------
--Give items categories
INSERT INTO purchase_categories
(
	purchase_id,
	category_id
)
VALUES
(
	1,
	5
);

INSERT INTO purchase_categories
(
	purchase_id,
	category_id
)
VALUES
(
	2,
	4
);

INSERT INTO purchase_categories
(
	purchase_id,
	category_id
)
VALUES
(
	3,
	3
);

INSERT INTO purchase_categories
(
	purchase_id,
	category_id
)
VALUES
(
	3,
	2
);

INSERT INTO purchase_categories
(
	purchase_id,
	category_id
)
VALUES
(
	3,
	5
);


------------------------------------------------------------------
------------------------------------------------------------------
--Emotions

INSERT INTO emotions
(
	emotion,
	icon_name
)
VALUES
(
	'Angry',
	'emotionMehIcon.png'
);

INSERT INTO emotions
(
	emotion,
	icon_name
)
VALUES
(
	'Happy',
	'emotionSmileyIcon.png'
);

INSERT INTO emotions
(
	emotion,
	icon_name
)
VALUES
(
	'Sad',
	'emotionSadIcon.png'
);

INSERT INTO emotions
(
	emotion,
	icon_name
)
VALUES
(
	'Indifferent',
	'emotionIndifferentIcon.png'
);

------------------------------------------------------------------
------------------------------------------------------------------
--Limits
INSERT INTO limits
(
	name,
	end_date,
	limit_amount,
	limit_type,
	limit_constraint,
	completed
)
VALUES
(
	'No indifferent spending',
	1351533749, --should be an actual date
	450,
	'emotions',
	4,
	'false'
);


INSERT INTO limit_types
(
	limit_type
)
VALUES
(
	'Emotion'
);

INSERT INTO limit_types
(
	limit_type
)
VALUES
(
	'Category'
);

INSERT INTO limit_types
(
	limit_type
)
VALUES
(
	'Satisfaction Level'
);

INSERT INTO limit_types
(
	limit_type
)
VALUES
(
	'Impulse Level'
);



------------------------------------------------------------------
------------------------------------------------------------------
--User

INSERT INTO users
(
	username,
	email,
	password,
	first_name,
	last_name,
	points,
	challenges_completed,
	avatar
)
VALUES
(
	'alonecuzzo',
	'jabari.bell@pxlflu.net',
	'password',
	'Jabari',
	'Bell',
	23,
	4,
	'avatar.png'
);

