package bruteforce;

import java.text.DecimalFormat;
import java.util.Scanner;

public class _14717 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int cases = 18*17/2;  // 18C2
        int win = 0;
        String percentage;
        DecimalFormat df = new DecimalFormat("0.000");

        int firstNum = sc.nextInt();
        int secondNum = sc.nextInt();
        sc.nextLine();

        boolean ttaeng = firstNum == secondNum;
        if (ttaeng) {  // 땡인 경우
            win = cases - (10 - firstNum);
            percentage = df.format(win * 1.0 / cases);
        } else {
            for (int i = 1; i <= 10; i++) {
                for (int j = i + 1; j <= 10; j++) {  // 끗인 경우
                    if ((i + j) % 10 < (firstNum + secondNum) % 10) {
                        if (firstNum == i || firstNum == j || secondNum == i || secondNum == j) {
                            win += 2;  // 2세트 이므로 만약 상대방이 a1(=a2)을 가져간 경우는 (a2,b1),(a2,b2)
                        } else {
                            win += 4;  // (a1,b1),(a1,b2),(a2,b1),(a2,b1)
                        }
                    }
                }
            }

            percentage = df.format(win * 1.0 / cases);
        }

        System.out.println(percentage);
    }
}
