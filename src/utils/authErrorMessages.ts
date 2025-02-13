
export const translateError = (error: string): string => {
  const errorMessages: { [key: string]: string } = {
    'Invalid login credentials': 'メールアドレスまたはパスワードが正しくありません',
    'Email not confirmed': 'メールアドレスが確認されていません',
    'User already registered': 'このメールアドレスは既に登録されています',
    'Password should be at least 6 characters': 'パスワードは6文字以上で入力してください',
    'Email format is invalid': 'メールアドレスの形式が正しくありません',
    'For security purposes, you can only request this after 14 seconds': 'セキュリティのため、14秒後に再度お試しください',
    'over_email_send_rate_limit': 'メール送信の制限に達しました。しばらく待ってから再度お試しください',
  };
  return errorMessages[error] || error;
};
