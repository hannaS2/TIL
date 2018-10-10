package divideandconquer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.Scanner;
import java.util.StringTokenizer;

public class _1992 {  // 1780과 똑같은 유형
    private static int[][] map;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());

        map = new int[n][n];
        for (int i = 0; i < n; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            char[] row = st.nextToken().toCharArray();
            for (int j = 0; j < n; j++) {
                map[i][j] = row[j]-'0';
            }
        }

        /* Scanner 사용이 BufferedReader보다 조금 더 시간이 오래 걸림
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sc.nextLine();

        map = new int[n][n];
        for (int i = 0; i < n; i++) {
            String row = sc.nextLine();
            for (int j = 0; j < n; j++) {
                map[i][j] = row.charAt(j) - '0';
            }
        }
        */

        divideMap(0, 0, n);

    }

    private static void divideMap(int x, int y, int n) {
        if (checkColor(x, y, n)) {
            System.out.print(map[x][y]);
        } else {
            int newN = n / 2;
            System.out.print("(");
            divideMap(x, y, newN);
            divideMap(x, y + newN, newN);
            divideMap(x + newN, y, newN);
            divideMap(x + newN, y + newN, newN);
            // 4가지 경우 밖에 없으므로 위 4줄로 풀어쓰는 것이 조금 시간 절약
            // for (int i = 0; i < 2; i++) {
            //     for (int j = 0; j < 2; j++) {
            //         divideMap(x + i * newN, y + j * newN, newN);
            //     }
            // }
            System.out.print(")");
        }
    }

    private static boolean checkColor(int x, int y, int n) {
        for (int i = x; i < x + n; i++) {
            for (int j = y; j < y + n; j++) {
                if (map[x][y] != map[i][j]) return false;
            }
        }
        return true;
    }
}
