package divideandconquer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class _10815 {
    private static int[] cards;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int n = Integer.parseInt(br.readLine());
        cards = new int[n];
        StringTokenizer st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) {
            cards[i] = Integer.parseInt(st.nextToken());
        }

        Arrays.sort(cards);  // binary search 를 위해 정렬

        int m = Integer.parseInt(br.readLine());
        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < m; i++) {
            System.out.print(findNumber(Integer.parseInt(st.nextToken()), 0, n - 1)+" ");
        }

    }

    /* iterative
    private static int findNumber(int target, int n) {
        int left = 0;
        int right = n - 1;
        while (left <= right) {
            int mid = (left + right) / 2;
            if (target == cards[mid]) return 1;
            else if (target < cards[mid]) right = mid - 1;
            else left = mid + 1;
        }
        return 0;
    }
    */

    // recursive
    private static int findNumber(int target, int l, int r) {
        int mid = (l + r) / 2;
        if (l > r) return 0;
        else {
            if (target == cards[mid]) return 1;
            else if (target < cards[mid]) return findNumber(target, l, mid - 1);
            else return findNumber(target, mid + 1, r);
        }
    }
}
