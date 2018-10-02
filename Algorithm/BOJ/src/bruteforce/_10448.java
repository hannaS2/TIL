package bruteforce;

import java.util.Scanner;

public class _10448 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] testNum = new int[n];
        for (int i = 0; i < n; i++) {
            testNum[i] = sc.nextInt();
        }

        for (int aTestNum : testNum) {
            System.out.println(isEureka(aTestNum));
        }

    }

    private static int isEureka(int num) {
        int result = 0;
        int[] triangleNum = new int[45];

        for (int i = 0; i < triangleNum.length; i++) {
            triangleNum[i] = (i + 1) * (i + 2) / 2;
        }

        for (int i = 0; i < 45; i++) {
            for (int j = 0; j < 45; j++) {
                for (int k = 0; k < 45; k++) {
                    if (triangleNum[i] + triangleNum[j] + triangleNum[k] == num) result = 1;
                }
            }
        }

        return result;
    }
}
