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
	category_name
)
VALUES
(
	'Entertainment'
);

INSERT INTO categories
(
	category_name
)
VALUES
(
	'Clothing'
);

INSERT INTO categories
(
	category_name
)
VALUES
(
	'Leisure'
);

INSERT INTO categories
(
	category_name
)
VALUES
(
	'Travel'
);

INSERT INTO categories
(
	category_name
)
VALUES
(
	'Video Games'
);

------------------------------------------------------------------
------------------------------------------------------------------
--Emotions

INSERT INTO emotions
(
	emotion
)
VALUES
(
	'Angry'
);

INSERT INTO emotions
(
	emotion
)
VALUES
(
	'Happy'
);

INSERT INTO emotions
(
	emotion
)
VALUES
(
	'Sad'
);

INSERT INTO emotions
(
	emotion
)
VALUES
(
	'Indifferent'
);
