package divideandconquer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

// 시간초과 줄이려면 Scanner 대신 BufferedReader 사용,
// println 대신 StringBuilder 사용
public class _2447 {
    private static String[][] map;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder sb = new StringBuilder();

        int n = Integer.parseInt(br.readLine());
        map = new String[n][n];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                map[i][j] = "*";
            }
        }

        drawStar(0, 0, n * 3, 0);

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                sb.append(map[i][j]);
            }
            sb.append("\n");
        }
        System.out.println(sb);
    }

    private static void drawStar(int x, int y, int n, int center) {
        if (center == 1) {
            for (int i = x; i < x + n / 3; i++) {
                for (int j = y; j < y + n / 3; j++) {
                    map[i][j] = " ";
                }
            }
        }

        if (n >= 3) {
            int newN = n / 3;
            drawStar(x, y, newN, 0);                                       // (1,1)
            drawStar(x, y + newN / 3, newN, 0);                         // (1,2)
            drawStar(x, y + 2 * newN / 3, newN, 0);                     // (1,3)

            drawStar(x + newN / 3, y, newN, 0);                         // (2,1)
            drawStar(x + newN / 3, y + newN / 3, newN, 1);           // (2,2)
            drawStar(x + newN / 3, y + 2 * newN / 3, newN, 0);       // (2,3)

            drawStar(x + 2 * newN / 3, y, newN, 0);                     // (3,1)
            drawStar(x + 2 * newN / 3, y + newN / 3, newN, 0);       // (3,2)
            drawStar(x + 2 * newN / 3, y + 2 * newN / 3, newN, 0);   // (3,3)
        }

    }
}