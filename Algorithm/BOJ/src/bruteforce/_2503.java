package bruteforce;

import java.util.Scanner;

class Baseball {
    private String num;
    int first;
    int second;
    int third;
    int strike;
    int ball;

    Baseball(String num, int strike, int ball) {
        this.num = num;
        this.strike = strike;
        this.ball = ball;
        this.first = num.charAt(0) - '0';
        this.second = num.charAt(1) - '0';
        this.third = num.charAt(2) - '0';
    }
}

public class _2503 {
    static int count = 0;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        sc.nextLine();

        Baseball[] balls = new Baseball[n];
        for (int i = 0; i < n; i++) {
            String[] ball = sc.nextLine().split(" ");
            balls[i] = new Baseball(ball[0], Integer.parseInt(ball[1]), Integer.parseInt(ball[2]));
        }

        for (int i = 1; i <= 9; i++) {
            for (int j = 1; j <= 9; j++) {
                if (i == j) continue;
                for (int k = 1; k <= 9; k++) {
                    if (i == k || j == k) continue;

                    boolean isNumber = true;
                    for (int l = 0; l < n; l++) {
                        int strike = 0;
                        int ball = 0;

                        if (balls[l].first == i) strike++;
                        if (balls[l].first == j || balls[l].first == k) ball++;

                        if (balls[l].second == j) strike++;
                        if (balls[l].second == i || balls[l].second == k) ball++;

                        if (balls[l].third == k) strike++;
                        if (balls[l].third == i || balls[l].third == j) ball++;

                        if (strike != balls[l].strike || ball != balls[l].ball) {
                            isNumber = false;
                            break;
                        }
                    }
                    if (isNumber) {
                        count++;
                    }

                }
            }
        }

        System.out.println(count);

    }

}
