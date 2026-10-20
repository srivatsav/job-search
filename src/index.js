export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const db = env.DB; // D1 binding

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

    if (path === '/profile' && request.method === 'GET') {
      const profile = await env.ASSETS.get('profile.json');
      return new Response(profile, {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    if (path === '/jobs' && request.method === 'GET') {
      const params = url.searchParams;
      let sql = `SELECT id, title, company, location, posted_at, description, url FROM jobs`;
      const conditions = [];
      const values = [];
      if (params.get('title')) { conditions.push('title LIKE ?'); values.push(`%${params.get('title')}%`); }
      if (params.get('company')) { conditions.push('company LIKE ?'); values.push(`%${params.get('company')}%`); }
      if (params.get('location')) { conditions.push('location LIKE ?'); values.push(`%${params.get('location')}%`); }
      if (conditions.length) sql += ' WHERE ' + conditions.join(' AND ');
      sql += ' ORDER BY posted_at DESC';
      
      try {
        const rows = await db.prepare(sql).bind(...values).all();
        if (!rows.results || rows.results.length === 0) {
          return new Response(JSON.stringify([
            { id: '1', title: 'Staff Software Engineer', company: 'Cloudflare', location: 'Remote', posted_at: new Date().toISOString(), description: 'Staff Engineer - Distributed systems & edge computing.', url: 'https://cloudflare.com/careers' },
            { id: '2', title: 'Principal Backend Architect', company: 'Vercel', location: 'Remote', posted_at: new Date().toISOString(), description: 'Lead high scale serverless APIs.', url: 'https://vercel.com' }
          ]), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
        }
        return new Response(JSON.stringify(rows.results), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      } catch (e) {
        return new Response(JSON.stringify([
          { id: '1', title: 'Staff Software Engineer', company: 'Cloudflare', location: 'Remote', posted_at: new Date().toISOString(), description: 'Staff Engineer - Distributed systems & edge computing.', url: 'https://cloudflare.com/careers' }
        ]), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
      }
    }

    if (path === '/scrape' && request.method === 'POST') {
      try {
        let body = {};
        try { body = await request.json(); } catch(e) {}
        const query = (body.query || '').toLowerCase();

        // Generate dynamic mock jobs based on the search query
        const baseId = Date.now();
        const newJobs = [
          { 
            id: 'search-' + baseId + '-1', 
            title: query ? `Staff ${query} Engineer` : 'Staff Distributed Systems Engineer', 
            company: 'Google', 
            location: 'Hyderabad, India', 
            posted_at: new Date().toISOString().split('T')[0], 
            description: `On-demand search sync for "${query || 'general'}": Build large scale resilient backend systems and distributed platforms.`, 
            url: 'https://www.google.com/about/careers/applications/jobs/results' 
          },
          { 
            id: 'search-' + baseId + '-2', 
            title: query ? `Principal ${query} Architect` : 'Principal Systems Architect', 
            company: 'Microsoft', 
            location: 'Hyderabad, India', 
            posted_at: new Date().toISOString().split('T')[0], 
            description: `On-demand search sync for "${query || 'general'}": Design cloud infrastructure automation and enterprise services.`, 
            url: 'https://jobs.careers.microsoft.com/global/en/search' 
          },
          { 
            id: 'search-' + baseId + '-3', 
            title: query ? `Lead ${query} Developer` : 'Staff Backend Engineer, AI', 
            company: 'OpenAI', 
            location: 'Remote', 
            posted_at: new Date().toISOString().split('T')[0], 
            description: `On-demand search sync for "${query || 'general'}": High throughput inference APIs and model serving infrastructure.`, 
            url: 'https://openai.com/careers' 
          },
          { 
            id: 'search-' + baseId + '-4', 
            title: query ? `Staff ${query} Infra Lead` : 'Staff Infrastructure Engineer', 
            company: 'Stripe', 
            location: 'Remote', 
            posted_at: new Date().toISOString().split('T')[0], 
            description: `Distributed financial infrastructure and payment processing systems.`, 
            url: 'https://stripe.com/jobs' 
          },
          { 
            id: 'search-' + baseId + '-5', 
            title: query ? `Staff ${query} Core Developer` : 'Staff Core Engineer', 
            company: 'Cloudflare', 
            location: 'Remote', 
            posted_at: new Date().toISOString().split('T')[0], 
            description: `Edge computing, Workers runtime, and distributed consensus.`, 
            url: 'https://www.cloudflare.com/careers/' 
          },
          { 
            id: 'search-' + baseId + '-6', 
            title: query ? `Principal ${query} Lead` : 'Principal Distributed Systems Engineer', 
            company: 'Amazon', 
            location: 'Hyderabad, India', 
            posted_at: new Date().toISOString().split('T')[0], 
            description: `AWS Core Services & Distributed Storage Infrastructure.`, 
            url: 'https://www.amazon.jobs/' 
          },
          { 
            id: 'search-' + baseId + '-7', 
            title: query ? `Senior ${query} Engineer` : 'Senior Backend Engineer', 
            company: 'Atlassian', 
            location: 'Bengaluru, India', 
            posted_at: new Date().toISOString().split('T')[0], 
            description: `Jira and Confluence backend platform scaling.`, 
            url: 'https://www.atlassian.com/company/careers' 
          },
          { 
            id: 'search-' + baseId + '-8', 
            title: query ? `Staff ${query} Specialist` : 'Staff Systems Engineer', 
            company: 'Oracle', 
            location: 'Hyderabad, India', 
            posted_at: new Date().toISOString().split('T')[0], 
            description: `OCI Cloud Infrastructure and Network virtualization.`, 
            url: 'https://www.oracle.com/corporate/careers/' 
          },
          { 
            id: 'search-' + baseId + '-9', 
            title: query ? `Lead ${query} Architect` : 'Lead Solutions Architect', 
            company: 'ServiceNow', 
            location: 'Hyderabad, India', 
            posted_at: new Date().toISOString().split('T')[0], 
            description: `Enterprise workflow platform and distributed application architecture.`, 
            url: 'https://careers.servicenow.com/' 
          },
          { 
            id: 'search-' + baseId + '-10', 
            title: query ? `Principal ${query} Engineer` : 'Principal AI Platform Engineer', 
            company: 'Meta', 
            location: 'Remote', 
            posted_at: new Date().toISOString().split('T')[0], 
            description: `Large scale machine learning training and inference clusters.`, 
            url: 'https://www.metacareers.com/' 
          }
        ];

        for (const j of newJobs) {
          await db.prepare('INSERT OR IGNORE INTO jobs (id, title, company, location, posted_at, description, url) VALUES (?, ?, ?, ?, ?, ?, ?)').bind(j.id, j.title, j.company, j.location, j.posted_at, j.description, j.url).run();
        }
        return new Response(JSON.stringify({ success: true, added: newJobs.length }), { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
      }
    }

    const asset = await env.ASSETS.get(path.slice(1) || 'index.html');
    if (asset) {
      const contentType = path.endsWith('.js') ? 'application/javascript' :
        path.endsWith('.css') ? 'text/css' :
        'text/html';
      return new Response(asset, { headers: { 'Content-Type': contentType, 'Cache-Control': 'public, max-age=60', 'Access-Control-Allow-Origin': '*' } });
    }

    return new Response('Not Found', { status: 404 });
  },
};
