package divideandconquer;

import java.io.*;
import java.util.Arrays;
import java.util.StringTokenizer;

public class _10816 {
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

/* 시간초과 ㅜㅜ
public class _10816 {
    private static int[] cards;
    private static int n;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        n = Integer.parseInt(br.readLine());
        cards = new int[n];
        StringTokenizer st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) {
            cards[i] = Integer.parseInt(st.nextToken());
        }

        Arrays.sort(cards);

        int m = Integer.parseInt(br.readLine());
        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < m; i++) {
            bw.write(countNumber(Integer.parseInt(st.nextToken()), 0, n - 1) + " ");
        }

        bw.flush();
        br.close();
        bw.close();

    }

    // iterative
    private static int countNumber(int target) {
        int left = 0;
        int right = n - 1;
        int count = 0;

        while (left <= right) {
            int mid = (left + right) / 2;
            if (target == cards[mid]) {
                count++;
                for (int i = left; i <= mid - 1; i++) {
                    if (target == cards[i]) count++;
                }
                for (int i = mid + 1; i <= right; i++) {
                    if (target == cards[i]) count++;
                }
                return count;
            } else if (target < cards[mid]) right = mid - 1;
            else left = mid + 1;
        }

        return count;
    }

    // recursive
    private static int countNumber(int target, int l, int r) {
        if (l == r) {
            if (target == cards[l]) return 1;
            else return 0;
        } else if (l > r) return 0;
        else {
            int mid = (l + r) / 2;
            if (target == cards[mid]) return 1 + countNumber(target, l, mid - 1) + countNumber(target, mid + 1, r);
            else if (target < cards[mid]) return countNumber(target, l, mid - 1);
            else return countNumber(target, mid + 1, r);
        }
    }
}
*/