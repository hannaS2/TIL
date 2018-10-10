package divideandconquer;

import java.util.Scanner;

public class _1780 {
    private static int[] result = new int[3]; // -1, 0, 1
    private static int[][] paper;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        sc.nextLine();

        paper = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                paper[i][j] = sc.nextInt();
            }
        }

        dividePaper(0, 0, n);

        for (int i = 0; i < 3; i++) {
            System.out.println(result[i]);
        }

    }

    private static void dividePaper(int x, int y, int n) {
        if (checkSameNum(x, y, n)) {
            result[paper[x][y] + 1]++;
        } else {
            int newN = n / 3;
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    dividePaper(x + i * newN, y + j * newN, newN);
                }
            }
        }
    }

    private static boolean checkSameNum(int x, int y, int n) {
        for (int i = x; i < x + n; i++) {
            for (int j = y; j < y + n; j++) {
                if (paper[x][y] != paper[i][j]) return false;
            }
        }
        return true;
    }

}
