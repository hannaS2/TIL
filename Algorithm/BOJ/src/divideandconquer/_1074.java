package divideandconquer;

import java.util.Scanner;

public class _1074 {
    private static int r;
    private static int c;
    private static int result;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        r = sc.nextInt();
        c = sc.nextInt();

        divide(0, 0, (int) Math.pow(2, n));

    }

    private static void divide(int x, int y, int n) {
        if (find(x, y, n)) {
            return;
        } else {
            int newN = n / 2;
            divide(x, y, newN);
            divide(x + newN, y, newN);
            divide(x, y + newN, newN);
            divide(x + newN, y + newN, newN);
        }

    }

    private static boolean find(int x, int y, int n) {
        if (n == 2) {
            result++;
            if (x == r && y == c) {
                System.out.println(result);
                return true;
            }
        }
        return false;
    }

}
