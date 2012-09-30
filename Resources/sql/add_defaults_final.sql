------------------------------------------------------------------
------------------------------------------------------------------
--Purchases



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

INSERT INTO categories
(
	category_name,
	icon_name,
	white_icon_name
)
VALUES
(
	'Electronics',
	'glyphicons_160_imac.png',
	'glyphicons_160_imac_white.png'
);


------------------------------------------------------------------
------------------------------------------------------------------
--Give items categories


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
	'Angry',
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
	'Happy',
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
	'Sad',
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
	'Indifferent',
	'emotionIndifferentIcon.png',
	'emotionIndifferentIcon_white.png'
);

------------------------------------------------------------------
------------------------------------------------------------------
--Limits


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

