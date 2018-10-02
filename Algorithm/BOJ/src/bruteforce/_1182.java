package bruteforce;

import java.util.Scanner;

public class _1182 {
    private static int n;
    private static int s;
    private static int result = 0;
    private static int[] numbers;
//    private static int[] flag;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String condition = sc.nextLine();
        String numberSet = sc.nextLine();

        n = Integer.parseInt(condition.split(" ")[0]);
        s = Integer.parseInt(condition.split(" ")[1]);

        numbers = new int[n];
//        flag = new int[n];
        for (int i = 0; i < n; i++) {
            numbers[i] = Integer.parseInt(numberSet.split(" ")[i]);
        }

        powerSet(0, 0);

        if (s == 0) result--;  // s가 0인 경우에는 공집합도 포함되므로 빼준다.
        System.out.println(result);


    }

    private static void powerSet(int count, int sum) {
        if (count == n) {
            if (sum == s) result++;
            return;
        }
        // 재귀로 부분집합 완전탐색
        powerSet(count + 1, sum + numbers[count]);  // 부분집합 선택
        powerSet(count + 1, sum);  // 부분집합 선택 안함


        /* 풀이2
        // int[] flag = new int[n] 만든 뒤 체크하는 방법
        if(count == n) {
            sum=0;
            for(int i=0;i<n;i++) {
                if(flag[i]==1) sum += numbers[i];
            }
            if(sum==s) result++;
            return;
        }
        flag[count]=1;
        powerSet(count+1,sum+numbers[count]);
        flag[count]=2;
        powerSet(count+1,sum);
        */

    }
}
