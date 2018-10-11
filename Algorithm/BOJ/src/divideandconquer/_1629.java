package divideandconquer;

import java.util.Scanner;

public class _1629 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        long n = sc.nextLong();
        long k = sc.nextLong();
        long divisor = sc.nextLong();

        // 풀이1
        long result = power(n, k, divisor);
        System.out.println(result);

        /* 풀이2(재귀x)
        long result = 1;
        long multiply = n % divisor;

        while (k > 0) {
            if (k % 2 == 1) {
                result *= multiply;
                result %= divisor;
            }
            multiply = ((multiply % divisor) * (multiply % divisor)) % divisor;
            B /= 2;
        }
        System.out.print(result);
        */

    }

    private static long power(long n, long k, long divisor) {
        if (k == 0) return 1;
        else {
            long temp = power(n, k / 2, divisor);
            if (k % 2 != 0) return (temp * temp % divisor) * n % divisor;
                // temp * temp * n * divisor 라고 하면 long범위를 벗어날 수 있다.
                // 각 수를 divisor로 나눈 나머지를 곱한 것을 divisor로 나눈 나머지와 두 수를 곱한 후 divisor로 나눈 나머지는 같다.
                // (A * B) % C = ((A % C) * (B % C)) % C
                // 따라서, 결과값이 divisor보다 커지지 않게 계산해준다.
            else return temp * temp % divisor;
        }
    }

}
