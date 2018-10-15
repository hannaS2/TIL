package divideandconquer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class _2263 {
    private static int[] inOrderPos;  // inOrder의 순서 index 저장
    private static int[] postOrder;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int n = Integer.parseInt(br.readLine());

        inOrderPos = new int[n+1];  // 순서 저장하는 것이므로 0..n-1 가 아니라 1..n 이어야 하므로 n+1
        postOrder = new int[n];
        StringTokenizer st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) {
            inOrderPos[Integer.parseInt(st.nextToken())] = i;
        }

        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) {
            postOrder[i] = Integer.parseInt(st.nextToken());
        }

        findPreOrder(0, n - 1, 0, n - 1);

    }

    private static void findPreOrder(int inS, int inE, int postS, int postE) {
        if (inS > inE || postS > postE) return;

        int root = postOrder[postE];
        System.out.print(root+" ");

        findPreOrder(inS, inOrderPos[root] - 1, postS, postS + inOrderPos[root] - inS - 1);  // left tree
        findPreOrder(inOrderPos[root] + 1, inE, postS + inOrderPos[root] - inS, postE - 1);  // right tree
    }
}
