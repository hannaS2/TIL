package divideandconquer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class _10816 {
    // C++ upperbound와 lowerbound사용해서 binary search => 아직 자바로 해결 못함(시간초과)ㅜ

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder sb = new StringBuilder();
        int[] cardCount = new int[20000001];
        final int MAX = 10000000;

        int n = Integer.parseInt(br.readLine());
        StringTokenizer st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) {
            cardCount[Integer.parseInt(st.nextToken()) + MAX]++;
        }

        int m = Integer.parseInt(br.readLine());
        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < m; i++) {
            sb.append(cardCount[Integer.parseInt(st.nextToken()) + MAX] + " ");
        }

        System.out.println(sb);

    }

}
