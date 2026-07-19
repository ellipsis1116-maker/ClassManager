export async function onRequestGet(context) {
  // context.env 包含了绑定的 KV 命名空间
  // 假设你在 Cloudflare Pages 后台将 KV 命名空间绑定为 "KV"
  const { env } = context;
  
  try {
    // 从 KV 中读取键名为 'student_list' 的数据
    const data = await env.KV.get('student_list');
    
    return new Response(data || "[]", {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    // 获取前端 POST 过来的 JSON 字符串
    const data = await request.text();
    
    // 保存到 KV 数据库，键名为 'student_list'
    await env.KV.put('student_list', data);
    
    return new Response(JSON.stringify({ success: true }), {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    });
  }
}
