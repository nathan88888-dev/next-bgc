import { supabase } from '@/services/supabaseClient';

export const sendFollowEmail = async (userEmail: string, groupName: string) => {
  if (!userEmail) return;

  // ✅ 1. 确保用户已登录（关键）
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  console.log('SESSION:', await supabase.auth.getSession());
  if (sessionError) {
    console.error('Get session error:', sessionError);
    return;
  }

  if (!session) {
    console.error('User not logged in → skip sending email');
    return;
  }

  // ✅ Debug：确认 token 存在
  console.log('User session:', session);

  const subject = `Welcome to follow ${groupName}! / 欢迎关注 ${groupName} / ¡Bienvenido a seguir a ${groupName}! / ${groupName}のフォローありがとうございます`;

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #f59e0b;">Welcome to follow ${groupName}!</h2>
      <p>Hope we can play together!</p>
      
      <hr style="border: 1px solid #eee; margin: 20px 0;" />
      
      <h2 style="color: #f59e0b;">欢迎关注 ${groupName}！</h2>
      <p>希望能一起游戏！</p>
      
      <hr style="border: 1px solid #eee; margin: 20px 0;" />
      
      <h2 style="color: #f59e0b;">¡Bienvenido a seguir a ${groupName}!</h2>
      <p>¡Esperamos poder jugar juntos!</p>
      
      <hr style="border: 1px solid #eee; margin: 20px 0;" />
      
      <h2 style="color: #f59e0b;">${groupName} のフォローありがとうございます！</h2>
      <p>一緒に遊べるのを楽しみにしています！</p>
    </div>
  `;

  try {
    // ✅ 2. 调用 Edge Function（自动带 Authorization）
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: { to: userEmail, subject, html },
    });

    if (error) {
      console.error('Edge Function error:', error);
    } else {
      console.log('Email sent result:', data);
    }
  } catch (err) {
    console.error('Exception sending follow email:', err);
  }
};