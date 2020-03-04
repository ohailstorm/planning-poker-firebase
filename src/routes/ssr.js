import express from 'express';
import { StaticRouter } from 'react-router';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../components/App';

const router = express.Router();

router.get('/*', async (req, res) => {
  const context = {};

  const html = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const theHtml = `<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta http-equiv="X-UA-Compatible" content="ie=edge" />
			<title>Planning Poker</title>
		</head>
	
		<body>
			<div id="root">${html}</div>
			<script src="/app.js" charset="utf-8"></script>
			<script src="/vendor.js" charset="utf-8"></script>
		</body>
	</html>`;
  res.send(theHtml);
});

export default router;
