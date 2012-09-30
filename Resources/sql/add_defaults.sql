------------------------------------------------------------------
------------------------------------------------------------------
--Purchases

INSERT INTO purchases
(
	item_name,
	item_price,
	question_1_emotion,
	question_2_due_date,
	question_3_due_date
)
VALUES
(
	'wii u',
	249.99,
	1,
	1348781278,
	1380317278
);

INSERT INTO purchases
(
	item_name,
	item_price,
	question_1_emotion,
	question_2_due_date,
	question_3_due_date
)
VALUES
(
	'gameboy',
	49.99,
	2,
	1380317278,
	1348781278
);

INSERT INTO purchases
(
	item_name,
	item_price,
	question_1_emotion,
	question_2_due_date,
	question_3_due_date
)
VALUES
(
	'playstation 3',
	299.99,
	1,
	1380317278,
	1380317278
);

------------------------------------------------------------------
------------------------------------------------------------------
--Categories


INSERT INTO categories
(
	category_name,
	icon_name,
	white_icon_name
)
VALUES
(
	'Drinks',
	'glyphicons_274_beer.png',
	'glyphicons_274_beer_white.png'
);

INSERT INTO categories
(
	category_name,
	icon_name,
	white_icon_name
)
VALUES
(
	'Food',
	'glyphicons_276_cutlery.png',
	'glyphicons_276_cutlery_white.png'
);

INSERT INTO categories
(
	category_name,
	icon_name,
	white_icon_name
)
VALUES
(
	'Clothing',
	'glyphicons_283_t-shirt.png',
	'glyphicons_283_t-shirt_white.png'
);

INSERT INTO categories
(
	category_name,
	icon_name,
	white_icon_name
)
VALUES
(
	'Sports',
	'glyphicons_312_rugby.png',
	'glyphicons_312_rugby_white.png'
);

INSERT INTO categories
(
	category_name,
	icon_name,
	white_icon_name
)
VALUES
(
	'Travel',
	'glyphicons_038_airplane.png',
	'glyphicons_038_airplane_white.png'
);

INSERT INTO categories
(
	category_name,
	icon_name,
	white_icon_name
)
VALUES
(
	'Video Games',
	'glyphicons_321_gamepad.png',
	'glyphicons_321_gamepad_white.png'
);

INSERT INTO categories
(
	category_name,
	icon_name,
	white_icon_name
)
VALUES
(
	'Business',
	'glyphicons_341_briefcase.png',
	'glyphicons_341_briefcase_white.png'
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
	icon_name,
	white_icon_name
)
VALUES
(
	'Anxious',
	'emotionMehIcon.png',
	'emotionMehIcon_white.png'
);

INSERT INTO emotions
(
	emotion,
	icon_name,
	white_icon_name
)
VALUES
(
	'Excited',
	'emotionSmileyIcon.png',
	'emotionSmileyIcon_white.png'
);

INSERT INTO emotions
(
	emotion,
	icon_name,
	white_icon_name
)
VALUES
(
	'Down',
	'emotionSadIcon.png',
	'emotionSadIcon_white.png'
);

INSERT INTO emotions
(
	emotion,
	icon_name,
	white_icon_name
)
VALUES
(
	'Nonchalant',
	'emotionIndifferentIcon.png',
	'emotionIndifferentIcon_white.png'
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
	avatar_url
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

