import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/context/UserContext';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const { setRole } = useUser();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Supabase automatically exchanges the code for a session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (data?.session) {
          const user = data.session.user;
          
          // Fetch or create profile
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (profileError && profileError.code !== 'PGRST116') {
             console.error('Error fetching profile:', profileError);
          }

          // If profile exists, use its role, otherwise default to user
          const role = profile?.role || 'user';
          
          // Store data in session for existing components that expect it
          sessionStorage.setItem('supabase_session', JSON.stringify(data.session));
          sessionStorage.setItem('supabase_user', JSON.stringify(user));
          
          // Mirror enriched profile for the app's user context
          const enrichedProfile = {
            ...profile,
            id: user.id,
            email: user.email,
            name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0],
            role: role,
            status: profile?.status || 'active'
          };
          sessionStorage.setItem('supabase_profile', JSON.stringify(enrichedProfile));
          
          setRole(role as any);
          toast.success('Successfully signed in!');
          navigate('/', { replace: true });
        } else {
          // No session found
          navigate('/signin', { replace: true });
        }
      } catch (err: any) {
        console.error('Auth callback error:', err);
        toast.error('Authentication failed: ' + err.message);
        navigate('/signin', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate, setRole]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Authenticating...</h2>
        <p className="text-gray-500">Completing your sign in, please wait.</p>
      </div>
    </div>
  );
}
