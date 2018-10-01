package bruteforce;

import java.util.Scanner;

public class _2231 {

    /* 풀이1
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int con = sc.nextInt();
        List<Integer> cons = new ArrayList<>();

        int n;
        for (int i = 1; i <= 1000000; i++) {
            n = i;
            char[] decomposition = (i+"").toCharArray();
            for (int j = 0; j < decomposition.length; j++) {
                n += Character.getNumericValue(decomposition[j]);
            }

            if(n == con) cons.add(i);
        }
        if(cons.isEmpty()) cons.add(0);

        cons.sort(null);
        System.out.println(cons.get(0));

    }
    */

    // 풀이2
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int con = sc.nextInt();

        int result = 0;
        for (int i = con; i > 0; i--) {
            int n = i;

            /* 풀이2-1
            char[] decomposition = (i + "").toCharArray();
            for (int j = 0; j < decomposition.length; j++) {
                n += Character.getNumericValue(decomposition[j]);
            }
            */
            // 풀이2-2
            String ns = i + "";
            for (int j = 0; j < ns.length(); j++) {
                n += ns.charAt(j) - 48;
            }

            if (n == con) result = i;
        }

        System.out.println(result);
    }
}
