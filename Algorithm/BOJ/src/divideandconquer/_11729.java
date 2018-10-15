package divideandconquer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class _11729 {
    private static int count = 0;
    private static StringBuilder sb = new StringBuilder();

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());

        hanoiTower(n, 1, 3);
        System.out.println(count);  // count를 세지 않아도 hanoiTower의 이동횟수는 2^n-1번
        System.out.println(sb);
    }

    // 방법1
    private static void hanoiTower(int n, int from, int to) {
        if (n == 0) return;

        hanoiTower(n - 1, from, 6 - from - to);  // n-1개를 기둥1에서 기둥2로
        count++;
        sb.append(from + " " + to + "\n");  // 1개를 기둥1에서 기둥3으로
        hanoiTower(n - 1, 6 - from - to, to);  // n-1개를 기둥2에서 기둥3으로
    }


    /* 방법2
    private static void hanoiTower(int n, int from, int by, int to) {
        count++;
        if (n == 1) sb.append(from + " " + to + "\n");
        else {
            hanoiTower(n - 1, from, to, by);       // n-1개를 기둥3을 이용해서 기둥1에서 기둥2로
            sb.append(from + " " + to + "\n");     // 1개를 기둥1에서 기둥3으로
            hanoiTower(n - 1, by, from, to);       // n-1개를 기둥1을 이용해서 기둥2에서 기둥3으로
        }
    }
    */
}
