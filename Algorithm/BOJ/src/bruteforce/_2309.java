package bruteforce;

import java.util.Arrays;
import java.util.Scanner;

public class _2309 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int sum = 0;
        boolean find = false;

        int[] dwarfs = new int[9];
        for (int i = 0; i < 9; i++) {
            dwarfs[i] = sc.nextInt();
            sum += dwarfs[i];
        }

        // 풀이1
        for (int i = 0; i < 9; i++) {
            if (find) break;
            for (int j = 0; j < 9; j++) {
                if (i == j) {
                    continue;  //같은 난쟁이를 두 번 빼는 것 방지
                }

                if (sum - dwarfs[i] - dwarfs[j] == 100) {
                    dwarfs[i] = 0;
                    dwarfs[j] = 0;
                    find = true;
                    break;
                }
            }
        }

        Arrays.sort(dwarfs);

        for (int dwarf : dwarfs) {
            if (dwarf != 0) System.out.println(dwarf);
        }

        /* 풀이2
        Arrays.sort(dwarfs);
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                sum = 0;
                for (int k = 0; k < 9; k++) {
                    if (k != i && k != j) sum += dwarfs[k];
                }
                if (sum == 100) {
                    for (int k = 0; k < 9; k++) {
                        if (k != i && k != j) System.out.println(dwarfs[k]);
                    }
                    find = true;
                    break;
                }
            }
            if (find) break;
        }
        */


    }
}
