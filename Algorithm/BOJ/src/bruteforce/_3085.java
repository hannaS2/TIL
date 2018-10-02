package bruteforce;

import java.util.Scanner;

public class _3085 {
    private static int max = 1;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        sc.nextLine();

        char[][] map = new char[n][n];
        for (int i = 0; i < n; i++) {
            String mapText = sc.nextLine();
            for (int j = 0; j < n; j++) {
                char[] mapTexts = mapText.toCharArray();
                map[i][j] = mapTexts[j];
            }
        }

        swapMap(n, map);
        System.out.println(max);

    }

    private static void swapMap(int n, char[][] map) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - 1; j++) {
                char temp = map[i][j];
                map[i][j] = map[i][j + 1];
                map[i][j + 1] = temp;

                findMax(n, map);

                char reTemp = map[i][j];
                map[i][j] = map[i][j + 1];
                map[i][j + 1] = reTemp;
            }
        }

        for (int j = 0; j < n; j++) {
            for (int i = 0; i < n - 1; i++) {
                char temp = map[i][j];
                map[i][j] = map[i + 1][j];
                map[i + 1][j] = temp;

                findMax(n, map);

                char reTemp = map[i][j];
                map[i][j] = map[i + 1][j];
                map[i + 1][j] = reTemp;
            }
        }
    }

    private static int findMax(int n, char[][] map) {

        for (int i = 0; i < n; i++) {
            int count = 1;
            for (int j = 0; j < n - 1; j++) {
                if (map[i][j] == map[i][j + 1]) {
                    count++;
//                    System.out.println("row: " + "[" + i + "," + j + "]" + "/" + count);
                } else {
                    count = 1;
                }
                max = Math.max(count, max);
            }
        }

        for (int j = 0; j < n; j++) {
            int count = 1;
            for (int i = 0; i < n - 1; i++) {
                if (map[i][j] == map[i + 1][j]) {
                    count++;
//                    System.out.println("column: " + "[" + i + "," + j + "]" + "/" + count);
                } else {
                    count = 1;
                }
                max = Math.max(count, max);
            }
        }

        return max;
    }

}
