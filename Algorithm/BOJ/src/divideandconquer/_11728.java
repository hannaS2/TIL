package divideandconquer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class _11728 {  // divide 가 이미 되어있는 mergeSort

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] size = br.readLine().split(" ");
        int n = Integer.parseInt(size[0]);
        int[] fArr = new int[n];
        int m = Integer.parseInt(size[1]);
        int[] sArr = new int[m];

        StringTokenizer st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) {
            fArr[i] = Integer.parseInt(st.nextToken());
        }

        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < m; i++) {
            sArr[i] = Integer.parseInt(st.nextToken());
        }

        merge(fArr, sArr);

    }

    private static void merge(int[] fArr, int[] sArr) {
        int[] mArr = new int[fArr.length + sArr.length];
        int i = 0;  // fArr
        int j = 0;  // sArr
        int k = 0;  // mArr

        while (i < fArr.length && j < sArr.length) {
            if (fArr[i] <= sArr[j]) {
                mArr[k] = fArr[i];
                i++;
            } else {
                mArr[k] = sArr[j];
                j++;
            }
            k++;
        }

        if (i == fArr.length) System.arraycopy(sArr, j, mArr, k, sArr.length - j);
        else System.arraycopy(fArr, i, mArr, k, fArr.length - i);

        for (int aMArr : mArr) {
            System.out.print(aMArr + " ");
        }
    }
}
