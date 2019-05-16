import request from '@/utils/request';

export function login() {
  return request(`http://101.132.27.104:7077/oauth/oauth2/token?grant_type=client_credentials&client_id=4iUmmr1G7IiZTT1mjjxpfQ&client_secret=2APu3beXVFarN62Nflz7oj`);
}