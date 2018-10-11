package divideandconquer;

import java.util.Scanner;

public class _1074 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int r = sc.nextInt();
        int c = sc.nextInt();

        System.out.println(find(r, c, n));

    }

    private static int find(int x, int y, int n) {
        if (n == 1) return 2 * x + y;
        else {
            if (x < pow2(n - 1)) {  // 1,2사분면
                if (y < pow2(n - 1)) {  // 2사분면
                    return find(x, y, n - 1);
                } else {  // 1사분면
                    return find(x, y - pow2(n - 1), n - 1) + pow2(2 * n - 2);
                }
            } else {  // 3,4사분면
                if (y < pow2(n - 1)) {  // 3사분면
                    return find(x - pow2(n - 1), y, n - 1) + 2 * pow2(2 * n - 2);
                } else {  // 4사분면
                    return find(x - pow2(n - 1), y - pow2(n - 1), n - 1) + 3 * pow2(2 * n - 2);
                }
            }
        }
    }

    private static int pow2(int k) {
        return (int) Math.pow(2, k);
    }
}
