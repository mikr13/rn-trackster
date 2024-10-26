
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { Large, P } from '@/components/ui/typography';
import { useDataFetching } from '@/hooks/useDataFetching';
import { useStore } from '@/store';
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query';
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
    marginBottom: 120,
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

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/gm;

const schema = z.object({
  email: z.string().email().min(5),
  password: z.string().min(8).regex(passwordRegex, "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character."),
  confirmPassword: z.string().min(8).regex(passwordRegex, "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character."),
}).refine(
  (values) => values.password === values.confirmPassword,
  {
    message: "Passwords don't match!",
    path: ["confirmPassword"],
  }
);

type SignUpForm = z.infer<typeof schema>;

const SignUpScreen = () => {
  const signUp = useStore(store => store.signUp)
  const { isError, error, isPending, mutate } = useMutation({
    mutationFn: async (data: SignUpForm) => {
      const dataToSend = {
        email: data.email,
        password: data.password,
      }
      return await signUp(dataToSend);
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(schema),
    mode: "onChange",
  })
  const onSubmit: SubmitHandler<SignUpForm> = (data) => mutate(data);

  useDataFetching({ isError, error, errorMessage: `Failed to edit blog` });

  return (
    <View style={styles.container}>
      <Large>Sign up for Trackster</Large>
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
        <View style={styles.formField}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Label>Confirm passwrod</Label>
                <Input
                  keyboardType='default'
                  placeholder='***********'
                  aria-label='confirm password'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize='none'
                  autoCorrect={false}
                />
              </>
            )}
            name="confirmPassword"
          />
          {errors.confirmPassword && <P className='text-destructive'>{errors.confirmPassword.message}</P>}
        </View>
        <Button
          disabled={isPending}
          aria-busy={isPending}
          onPress={handleSubmit(onSubmit)}
        >
          <Text>Sign up</Text>
        </Button>
      </View>
    </View>
  );
}

export default SignUpScreen;
