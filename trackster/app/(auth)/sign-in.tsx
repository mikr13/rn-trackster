
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { Large, P } from '@/components/ui/typography';
import { useDataFetching } from '@/hooks/useDataFetching';
import { isAuthenticated, useStore } from '@/store';
import { authSchema } from '@/utils/auth';
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import z from 'zod';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 40,
  },
  form: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  formField: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  }
});

type SignInForm = z.infer<typeof authSchema>;

const SignInScreen = () => {
  const isAuth = isAuthenticated();

  if (isAuth) {
    return router.replace('/track');
  };

  const signIn = useStore(store => store.signIn)
  const { isError, error, isPending, mutate } = useMutation({
    mutationFn: async (data: SignInForm) => {
      const res = await signIn(data);

      if (res) {
        router.replace('/track');
      } else {
        return false;
      }
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(authSchema),
    mode: "onChange",
  })
  const onSubmit: SubmitHandler<SignInForm> = (data) => mutate(data);

  useDataFetching({ isError, error, errorMessage: `Failed to sign in!` });

  return (
    <View style={styles.container}>
      <Large>Sign in to continue</Large>
      <View style={styles.form}>
        <View style={styles.formField}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Label>Email</Label>
                <Input
                  keyboardType='email-address'
                  placeholder='xyz@example.com'
                  aria-label='email'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize='none'
                  autoCorrect={false}
                />
              </>
            )}
            name="email"
          />
          {errors.email && <P className='text-destructive'>{errors.email.message}</P>}
        </View>
        <View style={styles.formField}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Label>Password</Label>
                <Input
                  keyboardType='visible-password'
                  placeholder='***********'
                  aria-label='password'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize='none'
                  autoCorrect={false}
                />
              </>
            )}
            name="password"
          />
          {errors.password && <P className='text-destructive'>{errors.password.message}</P>}
        </View>
        <Button
          disabled={isPending}
          aria-busy={isPending}
          onPress={handleSubmit(onSubmit)}
        >
          <Text>Sign in</Text>
        </Button>
      </View>
      <Button variant="link" onPress={() => router.replace('/sign-up')}>
        <Text>Don't have a account? Sign up instead.</Text>
      </Button>
    </View>
  );
}

export default SignInScreen;
