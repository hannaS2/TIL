package bruteforce;

import java.text.DecimalFormat;
import java.util.Scanner;

public class _14717 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int cases = 153;  // 18C2
        int win = 0;
        String percentage = "0.000";
        DecimalFormat df = new DecimalFormat("0.000");

        int firstNum = sc.nextInt();
        int secondNum = sc.nextInt();
        sc.nextLine();

        boolean ttaeng = firstNum == secondNum;
        if (ttaeng) {  // 땡인 경우
            win = cases - (10 - firstNum);
            percentage = df.format(win * 1.0 / cases);
        } else {
            int count = 0;
            for (int i = 1; i <= 10; i++) {
                for (int j = i + 1; j <= 10; j++) {  // 끗인 경우
                    if ((i + j) % 10 < (firstNum + secondNum) % 10) {
                        if (firstNum == i || firstNum == j || secondNum == i || secondNum == j) {
                            win += 2;  // 2세트 이므로 만약 상대방이 a1을 가져간 경우는 (a2,x),(x,a2)
                        } else {
                            win += 4;  // (a1,x),(x,a1),(a2,x),(x,a2)
                        }
                    }
                }
            }

            System.out.println(win);
            percentage = df.format(win * 1.0 / cases);
        }

        System.out.println(percentage);
    }
}
