
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { Large, Muted, P } from '@/components/ui/typography';
import { useDataFetching } from '@/hooks/useDataFetching';
import { useStore } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { z } from 'zod';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 40,
    marginTop: 80,
    marginBottom: 20,
  },
  changePasswordSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 10,
    width: '80%',
    flex: 1,
  },
  form: {
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

const changePasswordSchema = z.object({
  currentPassword: z.string().min(8, 'Current password must be at least 8 characters long'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters long'),
  confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters long'),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

const AccountScreen = () => {
  const signOut = useStore(store => store.signOut);
  const changePassword = useStore(store => store.changePassword);
  const { isError, error, isPending, mutate } = useMutation({
    mutationFn: async (data: ChangePasswordForm) => {
      const res = await changePassword(data);

      if (res) {
        router.replace('/account');
      } else {
        return false;
      }
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ChangePasswordForm> = (data) => mutate(data);

  useDataFetching({ isError, error, errorMessage: "Failed to change password!" });

  return (
    <View style={styles.container}>
      <Large>Account screen</Large>
      <View style={styles.changePasswordSection}>
        <Text>Change your password</Text>
        <View style={styles.form}>
          <View style={styles.formField}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Label>Current Password</Label>
                  <Input
                    keyboardType='visible-password'
                    placeholder='***********'
                    aria-label='current-password'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize='none'
                    autoCorrect={false}
                  />
                </>
              )}
              name="currentPassword"
            />
            {errors.currentPassword && <P className='text-destructive'>{errors.currentPassword.message}</P>}
          </View>
          <View style={styles.formField}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Label>New Password</Label>
                  <Input
                    keyboardType='visible-password'
                    placeholder='***********'
                    aria-label='new-password'
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize='none'
                    autoCorrect={false}
                  />
                </>
              )}
              name="newPassword"
            />
            {errors.newPassword && <P className='text-destructive'>{errors.newPassword.message}</P>}
          </View>
          <View style={styles.formField}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Label>Confirm Password</Label>
                  <Input
                    keyboardType='visible-password'
                    placeholder='***********'
                    aria-label='confirm-password'
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
            <Text>Change Password</Text>
          </Button>
        </View>
      </View>
      <View>
        <Button variant="destructive" onPress={async () => {
          await signOut();
          router.replace('/sign-in');
        }}>
          <Text>Sign out</Text>
        </Button>
        <Muted>Don't worry, we'll keep your data safe. See you later!</Muted>
      </View>
    </View>
  );
}

export default AccountScreen;
