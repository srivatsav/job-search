export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const db = env.DB; // D1 binding

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // GET candidate profile (static from JSON file)
    if (path === '/profile' && request.method === 'GET') {
      const profile = await env.ASSETS.get('profile.json');
      return new Response(profile, {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', },
      });
    }

    // GET jobs list, optional filters via query params
    if (path === '/jobs' && request.method === 'GET') {
      const params = url.searchParams;
      let sql = `SELECT id, title, company, location, posted_at, description FROM jobs`;
      const conditions = [];
      const values = [];
      if (params.get('title')) { conditions.push('title LIKE ?'); values.push(`%${params.get('title')}%`); }
      if (params.get('company')) { conditions.push('company LIKE ?'); values.push(`%${params.get('company')}%`); }
      if (params.get('location')) { conditions.push('location LIKE ?'); values.push(`%${params.get('location')}%`); }
      if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
      sql += ' ORDER BY posted_at DESC';
      const rows = await db.prepare(sql).bind(...values).all();
      return new Response(JSON.stringify(rows.results), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', },
      });
    }

    // POST /scrape – trigger a scrape (placeholder)
    if (path === '/scrape' && request.method === 'POST') {
      // In a real implementation this would invoke the portal CLI scripts (e.g., via a background worker or Cloudflare Queue).
      // Here we just acknowledge the request.
      return new Response(JSON.stringify({ status: 'queued' }), {
        status: 202,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', },
      });
    }

    // Fallback – serve static assets (HTML UI) from KV binding named ASSETS
    const asset = await env.ASSETS.get(path.slice(1) || 'index.html');
    if (asset) {
      const contentType = path.endsWith('.js') ? 'application/javascript' :
        path.endsWith('.css') ? 'text/css' :
        'text/html';
      return new Response(asset, { headers: { 'Content-Type': contentType, 'Cache-Control': 'public, max-age=60', 'Access-Control-Allow-Origin': '*', }, });
    }

    return new Response('Not Found', { status: 404 });
  },
};
